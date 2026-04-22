#!/bin/bash
FILE="/Users/openclaw/.openclaw/workspace-philly/sciatica-site/content-staging/best-mattress-for-sciatica-2026.md"

echo "=== WORD COUNT ==="
wc -w "$FILE"

echo ""
echo "=== IMAGE COUNT ==="
grep -c '!\[' "$FILE"
grep '!\[' "$FILE"

echo ""
echo "=== INTERNAL LINKS ==="
grep -o '](/[^)]*)' "$FILE" | grep -v 'http' | head -20

echo ""
echo "=== CROSS-NETWORK LINKS ==="
grep -o 'https://[^)]*' "$FILE" | grep -v 'sciaticaspot.com' | grep -v 'unsplash.com' | head -10

echo ""
echo "=== YAML VALIDATION ==="
python3 -c "
import yaml
content = open('$FILE').read().split('---')
if len(content) >= 3:
    frontmatter = '---'.join(content[1:3])
    try:
        yaml.safe_load(frontmatter)
        print('YAML: VALID')
    except Exception as e:
        print(f'YAML ERROR: {e}')
else:
    print('YAML: Could not parse frontmatter')
"

echo ""
echo "=== PLACEHOLDER CHECK ==="
grep -i "TODO\|INSERT\|PLACEHOLDER\|visual for\|{#" "$FILE" || echo "No placeholders found - CLEAN"
