#!/usr/bin/env python3
"""Generate an animated MP4 video demonstrating sciatica stretches."""

import subprocess
import tempfile
import os
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1280, 720
FPS = 30
SLIDE_DURATION = 1.75  # seconds per slide (~7s total for 4 slides)
FRAMES_PER_SLIDE = int(FPS * SLIDE_DURATION)

TEAL = (13, 148, 136)
DARK_TEAL = (10, 120, 110)
WHITE = (255, 255, 255)
LIGHT_TEAL = (200, 240, 237)
ACCENT = (255, 220, 100)

OUTPUT_PATH = "/Users/openclaw/.openclaw/workspace-philly/sciatica-site/public/videos/sciatica-stretches-demo.mp4"


def get_font(size, bold=False):
    """Try to load a nice font, fall back to default."""
    font_paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except Exception:
                continue
    return ImageFont.load_default()


def draw_rounded_rect(draw, xy, radius, fill):
    """Draw a rounded rectangle."""
    x0, y0, x1, y1 = xy
    draw.rectangle([x0 + radius, y0, x1 - radius, y1], fill=fill)
    draw.rectangle([x0, y0 + radius, x1, y1 - radius], fill=fill)
    draw.pieslice([x0, y0, x0 + 2 * radius, y0 + 2 * radius], 180, 270, fill=fill)
    draw.pieslice([x1 - 2 * radius, y0, x1, y0 + 2 * radius], 270, 360, fill=fill)
    draw.pieslice([x0, y1 - 2 * radius, x0 + 2 * radius, y1], 90, 180, fill=fill)
    draw.pieslice([x1 - 2 * radius, y1 - 2 * radius, x1, y1], 0, 90, fill=fill)


def text_center_x(draw, text, font):
    """Get x position to center text."""
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    return (WIDTH - tw) // 2


def create_slide_1():
    """Title slide."""
    img = Image.new("RGB", (WIDTH, HEIGHT), TEAL)
    draw = ImageDraw.Draw(img)

    # Decorative top bar
    draw.rectangle([0, 0, WIDTH, 8], fill=ACCENT)

    # Main title
    font_title = get_font(52, bold=True)
    font_sub = get_font(26)
    font_site = get_font(20)

    title = "8 Sciatica Stretches"
    title2 = "for Immediate Relief"
    subtitle = "Follow along \u2014 hold each stretch 30\u201360 seconds"
    site = "SciaticaSpot.com"

    # Draw title lines
    x = text_center_x(draw, title, font_title)
    draw.text((x, 200), title, fill=WHITE, font=font_title)

    x = text_center_x(draw, title2, font_title)
    draw.text((x, 268), title2, fill=WHITE, font=font_title)

    # Divider line
    draw.rectangle([WIDTH // 2 - 120, 360, WIDTH // 2 + 120, 363], fill=ACCENT)

    # Subtitle
    x = text_center_x(draw, subtitle, font_sub)
    draw.text((x, 390), subtitle, fill=LIGHT_TEAL, font=font_sub)

    # Site name at bottom
    x = text_center_x(draw, site, font_site)
    draw.text((x, 650), site, fill=LIGHT_TEAL, font=font_site)

    # Bottom bar
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=ACCENT)

    return img


def draw_stretch_card(draw, x, y, w, h, number, name, duration, font_num, font_name, font_dur):
    """Draw a single stretch card."""
    # Card background
    draw_rounded_rect(draw, (x, y, x + w, y + h), 12, fill=DARK_TEAL)

    # Number circle
    cx, cy = x + 35, y + h // 2
    draw.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=ACCENT)
    num_text = str(number)
    bbox = draw.textbbox((0, 0), num_text, font=font_num)
    nw = bbox[2] - bbox[0]
    nh = bbox[3] - bbox[1]
    draw.text((cx - nw // 2, cy - nh // 2 - 2), num_text, fill=TEAL, font=font_num)

    # Stretch name
    draw.text((x + 65, y + 14), name, fill=WHITE, font=font_name)

    # Duration
    draw.text((x + 65, y + 48), duration, fill=LIGHT_TEAL, font=font_dur)


def create_slide_2():
    """Stretches 1-4."""
    img = Image.new("RGB", (WIDTH, HEIGHT), TEAL)
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, WIDTH, 8], fill=ACCENT)
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=ACCENT)

    font_heading = get_font(40, bold=True)
    font_num = get_font(22, bold=True)
    font_name = get_font(26, bold=True)
    font_dur = get_font(20)

    heading = "Stretches 1\u20134"
    x = text_center_x(draw, heading, font_heading)
    draw.text((x, 40), heading, fill=WHITE, font=font_heading)

    # Divider
    draw.rectangle([WIDTH // 2 - 80, 95, WIDTH // 2 + 80, 97], fill=ACCENT)

    stretches = [
        ("Knee-to-Chest Hug", "Hold 30 seconds each side"),
        ("Figure-4 Piriformis Stretch", "Hold 30\u201360 seconds each side"),
        ("Cat-Cow Spinal Mobilization", "10 slow reps \u2014 inhale cow, exhale cat"),
        ("Child\u2019s Pose", "Hold 30\u201390 seconds \u2014 arms extended"),
    ]

    card_w, card_h = 540, 85
    gap = 20
    start_y = 130
    cols = [(WIDTH // 2 - card_w - gap // 2), (WIDTH // 2 + gap // 2)]

    for i, (name, dur) in enumerate(stretches):
        col = i % 2
        row = i // 2
        cx = cols[col]
        cy = start_y + row * (card_h + gap)
        draw_stretch_card(draw, cx, cy, card_w, card_h, i + 1, name, dur, font_num, font_name, font_dur)

    # Tip box at bottom
    font_tip = get_font(22)
    tip = "Breathe deeply \u2014 never bounce or force the stretch"
    draw_rounded_rect(draw, (140, 580, WIDTH - 140, 640), 10, fill=DARK_TEAL)
    x = text_center_x(draw, tip, font_tip)
    draw.text((x, 596), tip, fill=ACCENT, font=font_tip)

    return img


def create_slide_3():
    """Stretches 5-8."""
    img = Image.new("RGB", (WIDTH, HEIGHT), TEAL)
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, WIDTH, 8], fill=ACCENT)
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=ACCENT)

    font_heading = get_font(40, bold=True)
    font_num = get_font(22, bold=True)
    font_name = get_font(26, bold=True)
    font_dur = get_font(20)

    heading = "Stretches 5\u20138"
    x = text_center_x(draw, heading, font_heading)
    draw.text((x, 40), heading, fill=WHITE, font=font_heading)

    draw.rectangle([WIDTH // 2 - 80, 95, WIDTH // 2 + 80, 97], fill=ACCENT)

    stretches = [
        ("Seated Spinal Twist", "Hold 30 seconds each side"),
        ("Standing Hamstring Stretch", "Hold 30 seconds each leg"),
        ("Sciatic Nerve Flossing", "10 slow reps \u2014 gentle gliding motion"),
        ("Prone Press-Up (Cobra)", "10 reps \u2014 hold 2\u20133 sec at top"),
    ]

    card_w, card_h = 540, 85
    gap = 20
    start_y = 130
    cols = [(WIDTH // 2 - card_w - gap // 2), (WIDTH // 2 + gap // 2)]

    for i, (name, dur) in enumerate(stretches):
        col = i % 2
        row = i // 2
        cx = cols[col]
        cy = start_y + row * (card_h + gap)
        draw_stretch_card(draw, cx, cy, card_w, card_h, i + 5, name, dur, font_num, font_name, font_dur)

    font_tip = get_font(22)
    tip = "Stop immediately if pain increases or shoots down the leg"
    draw_rounded_rect(draw, (120, 580, WIDTH - 120, 640), 10, fill=DARK_TEAL)
    x = text_center_x(draw, tip, font_tip)
    draw.text((x, 596), tip, fill=ACCENT, font=font_tip)

    return img


def create_slide_4():
    """Closing slide."""
    img = Image.new("RGB", (WIDTH, HEIGHT), TEAL)
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, WIDTH, 8], fill=ACCENT)
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=ACCENT)

    font_site = get_font(56, bold=True)
    font_tag = get_font(28)
    font_small = get_font(20)

    site = "SciaticaSpot.com"
    tagline = "Stretch 2\u20133x daily for best results"
    disclaimer = "Consult a healthcare professional before starting any exercise program"

    # Site name
    x = text_center_x(draw, site, font_site)
    draw.text((x, 250), site, fill=ACCENT, font=font_site)

    # Divider
    draw.rectangle([WIDTH // 2 - 100, 330, WIDTH // 2 + 100, 333], fill=WHITE)

    # Tagline
    x = text_center_x(draw, tagline, font_tag)
    draw.text((x, 365), tagline, fill=WHITE, font=font_tag)

    # Disclaimer
    x = text_center_x(draw, disclaimer, font_small)
    draw.text((x, 620), disclaimer, fill=LIGHT_TEAL, font=font_small)

    return img


def create_fade_frames(slide_from, slide_to, num_frames=10):
    """Create fade transition frames between two slides."""
    frames = []
    for i in range(num_frames):
        alpha = i / (num_frames - 1)
        blended = Image.blend(slide_from, slide_to, alpha)
        frames.append(blended)
    return frames


def main():
    print("Generating slides...")
    slides = [create_slide_1(), create_slide_2(), create_slide_3(), create_slide_4()]

    # Build frame sequence with fade transitions
    fade_frames = 8  # frames for each transition
    hold_frames = FRAMES_PER_SLIDE - fade_frames

    all_frames = []
    for i, slide in enumerate(slides):
        # Hold the slide
        for _ in range(hold_frames):
            all_frames.append(slide)
        # Fade to next slide (if not last)
        if i < len(slides) - 1:
            all_frames.extend(create_fade_frames(slide, slides[i + 1], fade_frames))

    # Hold last slide a bit longer
    for _ in range(fade_frames):
        all_frames.append(slides[-1])

    total_seconds = len(all_frames) / FPS
    print(f"Total frames: {len(all_frames)}, Duration: {total_seconds:.1f}s")

    # Save frames to temp directory, then use ffmpeg
    with tempfile.TemporaryDirectory() as tmpdir:
        print("Saving frames...")
        for i, frame in enumerate(all_frames):
            frame.save(os.path.join(tmpdir, f"frame_{i:04d}.png"))

        print("Encoding video with ffmpeg...")
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

        cmd = [
            "ffmpeg", "-y",
            "-framerate", str(FPS),
            "-i", os.path.join(tmpdir, "frame_%04d.png"),
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-preset", "medium",
            "-crf", "23",
            "-movflags", "+faststart",
            OUTPUT_PATH,
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print("ffmpeg error:", result.stderr)
            raise RuntimeError("ffmpeg failed")

    print(f"Video saved to: {OUTPUT_PATH}")
    # Verify
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration,size",
         "-of", "default=noprint_wrappers=1", OUTPUT_PATH],
        capture_output=True, text=True
    )
    print(probe.stdout)


if __name__ == "__main__":
    main()
