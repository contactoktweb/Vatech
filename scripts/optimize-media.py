import os
import sys
import shutil
import subprocess
from PIL import Image

PUBLIC_DIR = os.path.join(os.getcwd(), "public")
FFMPEG_BIN = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"

def optimize_image(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in [".png", ".jpg", ".jpeg", ".webp", ".bmp"]:
        return 0, 0
    
    orig_size = os.path.getsize(filepath)
    try:
        with Image.open(filepath) as img:
            w, h = img.size
            max_dim = 1600
            if max(w, h) > max_dim:
                ratio = max_dim / max(w, h)
                new_size = (int(w * ratio), int(h * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            temp_path = filepath + ".tmp"
            if ext in [".jpg", ".jpeg"]:
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(temp_path, "JPEG", quality=78, optimize=True, progressive=True)
            elif ext == ".png":
                # For PNG with transparency or full color, save with optimize=True and max compression
                img.save(temp_path, "PNG", optimize=True, compress_level=9)
            elif ext == ".webp":
                img.save(temp_path, "WEBP", quality=78, method=6)
            elif ext == ".bmp":
                img.save(temp_path, "BMP")
            else:
                return orig_size, orig_size

            new_size = os.path.getsize(temp_path)
            if new_size < orig_size:
                os.replace(temp_path, filepath)
                return orig_size, new_size
            else:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                return orig_size, orig_size
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")
        return orig_size, orig_size

def optimize_video(filepath):
    orig_size = os.path.getsize(filepath)
    temp_path = filepath + ".tmp.mp4"
    cmd = [
        FFMPEG_BIN, "-y", "-i", filepath,
        "-vf", "scale=-2:720",
        "-c:v", "libx264", "-crf", "28", "-preset", "veryfast",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        temp_path
    ]
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=300)
        if result.returncode == 0 and os.path.exists(temp_path):
            new_size = os.path.getsize(temp_path)
            if new_size < orig_size:
                os.replace(temp_path, filepath)
                return orig_size, new_size
            else:
                os.remove(temp_path)
                return orig_size, orig_size
        else:
            print(f"ffmpeg failed on {filepath}: {result.stderr.decode('utf-8', errors='ignore')[-200:]}")
    except Exception as e:
        print(f"Error compressing video {filepath}: {e}")
    if os.path.exists(temp_path):
        try:
            os.remove(temp_path)
        except:
            pass
    return orig_size, orig_size

def main():
    mockup = os.path.join(PUBLIC_DIR, "reference-mockup.png")
    if os.path.exists(mockup):
        os.remove(mockup)
        print("Removed unused reference-mockup.png")

    total_orig = 0
    total_new = 0

    image_files = []
    video_files = []

    for root, dirs, files in os.walk(PUBLIC_DIR):
        for f in files:
            full_path = os.path.join(root, f)
            ext = os.path.splitext(f)[1].lower()
            if ext in [".png", ".jpg", ".jpeg", ".webp", ".bmp"]:
                image_files.append(full_path)
            elif ext == ".mp4":
                video_files.append(full_path)

    print(f"Optimizing {len(image_files)} images...")
    for idx, img_path in enumerate(image_files):
        o, n = optimize_image(img_path)
        total_orig += o
        total_new += n
        if (idx + 1) % 50 == 0 or idx + 1 == len(image_files):
            print(f"Processed {idx + 1}/{len(image_files)} images")

    print(f"\nOptimizing {len(video_files)} videos using {FFMPEG_BIN}...")
    for idx, vid_path in enumerate(video_files):
        rel = os.path.relpath(vid_path, PUBLIC_DIR)
        print(f"Compressing video [{idx+1}/{len(video_files)}]: {rel}...")
        o, n = optimize_video(vid_path)
        total_orig += o
        total_new += n
        reduction = ((1 - n/o)*100) if o > 0 else 0
        print(f"  {rel}: {o/(1024*1024):.2f} MB -> {n/(1024*1024):.2f} MB ({reduction:.1f}% reduction)")

    saved = total_orig - total_new
    print("\n" + "="*50)
    print(f"Original size: {total_orig/(1024*1024):.2f} MB")
    print(f"Optimized size: {total_new/(1024*1024):.2f} MB")
    print(f"Saved: {saved/(1024*1024):.2f} MB ({((saved/total_orig)*100) if total_orig else 0:.1f}% reduction)")
    print("="*50)

if __name__ == "__main__":
    main()
