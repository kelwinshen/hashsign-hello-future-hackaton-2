import json
import os

# Directory to save the metadata files
output_dir = "e_materai_metadata"
os.makedirs(output_dir, exist_ok=True)

# IPFS CID for the image
ipfs_image_cid = "bafkreiglkbptfzquzh4vs3gsf5ijutaiq5xrnhhe5ufnbkajvamw6gfeo4"

# Generate metadata for 100 NFTs
for i in range(1, 101):
    metadata = {
        "name": f"e-Materai #{i}",
        "description": "An official digital stamp of Indonesia.",
        "image": f"ipfs://{ipfs_image_cid}",
        "attributes": [
            {
                "trait_type": "Issuer",
                "value": "Government of Indonesia"
            },
            {
                "trait_type": "Category",
                "value": "Official Document"
            }
        ]
    }

    # Save metadata as JSON file
    file_name = f"{output_dir}/e_materai_{i}.json"
    with open(file_name, "w") as file:
        json.dump(metadata, file, indent=4)

    print(f"Generated metadata file: {file_name}")

print("\nAll metadata files generated successfully.")
