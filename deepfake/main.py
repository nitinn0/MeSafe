import sys
import os
import subprocess
import json


VIDEO_EXTENSIONS = {'.mp4', '.mkv', '.avi', '.mov', '.webm'}
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}


AI_SOFTWARE_TAGS = [
    "DeepFaceLab", "FaceApp", "RunwayML", "Gigapixel AI", "DALL·E", "MidJourney", "Stable Diffusion"
]

def is_video(file_path):
   
    return os.path.splitext(file_path)[1].lower() in VIDEO_EXTENSIONS

def is_image(file_path):
 
    return os.path.splitext(file_path)[1].lower() in IMAGE_EXTENSIONS

def extract_metadata(file_path):

    if is_video(file_path):
        cmd = [
            "ffprobe", "-v", "quiet", "-print_format", "json",
            "-show_format", "-show_streams", file_path
        ]
    elif is_image(file_path):
        cmd = ["exiftool", "-json", file_path]
    else:
        return {"error": "Unsupported file type."}

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        metadata = json.loads(result.stdout)

        
        if isinstance(metadata, list):
            metadata = metadata[0]

        return metadata
    except Exception as e:
        return {"error": str(e)}

def analyze_metadata(metadata):
    
    if "error" in metadata:
        return {"ai_generated": False, "reason": metadata["error"]}

    suspicious = False
    reasons = []

    
    software_used = metadata.get("Software", "") + " " + metadata.get("CreatorTool", "")
    for ai_tool in AI_SOFTWARE_TAGS:
        if ai_tool.lower() in software_used.lower():
            suspicious = True
            reasons.append(f"AI editing software detected: {ai_tool}")

   
    if is_image(metadata.get("SourceFile", "")):
        if not metadata.get("Make") or not metadata.get("Model"):
            suspicious = True
            reasons.append("possibly AI-generated.")

    
    if is_video(metadata.get("SourceFile", "")):
        streams = metadata.get("streams", [])
        if streams:
            codec = streams[0].get("codec_name", "")
            if codec in ["av1", "vp9"]:
                suspicious = True
                reasons.append(" AI-generated videos.")

    return {"ai_generated": suspicious, "reason": reasons}


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 main.py <file>")
        sys.exit(1)

    file_path = sys.argv[1]
    
    if not os.path.exists(file_path):
        print("Error: File does not exist.")
        sys.exit(1)

    metadata = extract_metadata(file_path)
    analysis = analyze_metadata(metadata)
    
    print(json.dumps(analysis, indent=4))
