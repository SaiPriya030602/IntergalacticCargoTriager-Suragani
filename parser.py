import json
import re

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def parse_manifest(filename):
    results = []
    
    with open(filename, 'r') as f:
        content = f.read()
    
    pattern = r'\[[\d-]+\]\s*\|\|\s*(CRG-\d+)\s*::\s*(\d+)\s*>>\s*(.+)'
    matches = re.findall(pattern, content)
    
    for match in matches:
        cargo_id = match[0].strip()
        weight = float(match[1].strip())
        destination = match[2].strip()
        
        # Rule 1: check for Sector-7 substring
        if "Sector-7" in destination:
            weight = weight * 1.45
        
        #Rule 2 : round weight to nearest whole number and also fingd if weight is prime number
        weight = round(weight)
        
        if is_prime(weight):
            print(f"Discarding {cargo_id} because weight {weight} is prime")
            continue
        
        results.append({
            "id": cargo_id,
            "weight_kg": weight,
            "destination": destination
        })
    
    return results

cargo_data = parse_manifest("manifest.txt")

# Saving to JSON file 
with open("Task 1 - Suragani - Parser.json", "w") as f:
    json.dump(cargo_data, f, indent=2)

print(f"Total valid records: {len(cargo_data)}")
print(json.dumps(cargo_data, indent=2))