class WorldLevel {
  constructor(levelJson) {
    this.name = levelJson.name ?? "Level";

    this.theme = Object.assign(
      { bg: "#F0F0F0", platform: "#C8C8C8", blob: "#1478FF" },
      levelJson.theme ?? {},
    );

    // Physics knobs
    this.gravity = levelJson.gravity ?? 0.65;
    this.jumpV = levelJson.jumpV ?? -11.0;

    // Camera knob (data-driven view state)
    this.camLerp = levelJson.camera?.lerp ?? 0.12;

    // World size + death line
    this.w = levelJson.world?.w ?? 2400;
    this.h = levelJson.world?.h ?? 360;
    this.deathY = levelJson.world?.deathY ?? this.h + 200;

    // Start
    this.start = Object.assign({ x: 80, y: 220, r: 26 }, levelJson.start ?? {});

    // Platforms
    this.platforms = (levelJson.platforms ?? []).map(
      (p) => new Platform(p.x, p.y, p.w, p.h),
    );

    this.symbols = [
      { x: 1500, y: 300 },
      { x: 2800, y: 250 },
      { x: 4200, y: 280 },
    ];
  }

  drawWorld() {
    push();
    rectMode(CORNER);
    noStroke();

    // golden symbols
    fill(255, 215, 0);
    for (let s of this.symbols) {
      ellipse(s.x, s.y, 16);
    }

    // subtle fog overlay
    fill(255, 255, 255, 30);
    rect(0, 0, this.w, this.h);

    // platforms
    fill(this.theme.platform);
    for (const p of this.platforms) {
      rect(p.x, p.y, p.w, p.h);
    }

    pop();
  }
}
