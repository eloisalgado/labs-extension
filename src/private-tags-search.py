import os
import pydicom
from pydicom.tag import Tag

def is_dicom_file(filepath):
    try:
        with open(filepath, 'rb') as f:
            f.seek(128)
            return f.read(4) == b'DICM'
    except:
        return False

def find_private_tags_in_file(filepath):
    try:
        ds = pydicom.dcmread(filepath, stop_before_pixels=True)
        private_tags = []

        for elem in ds.iterall():
            if elem.tag.is_private:
                private_tags.append((str(elem.tag), elem.VR, elem.name, elem.value))

        return private_tags
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return []

def scan_folder_for_private_tags(folder_path):
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(".dcm"):
                filepath = os.path.join(root, file)
                if is_dicom_file(filepath):
                    private_tags = find_private_tags_in_file(filepath)
                    if private_tags:
                        print(f"\n📁 File: {filepath}")
                        for tag, vr, name, value in private_tags:
                            print(f"  ➤ Tag: {tag} | VR: {vr} | Name: {name} | Value: {repr(value)[:100]}")  # truncate long values
                else:
                    print(f"Skipping non-DICOM file: {filepath}")

if __name__ == "__main__":
    folder = input("Enter the folder path containing DICOM files: ").strip()
    if os.path.isdir(folder):
        scan_folder_for_private_tags(folder)
    else:
        print("Invalid folder path.")
