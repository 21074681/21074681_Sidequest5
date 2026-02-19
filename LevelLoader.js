class LevelLoader {
  static fromLevelsJson(allData, index) {
    if (!allData || !allData.levels || !allData.levels[index]) {
      throw new Error("Level data is missing or malformed.");
    }

    return new WorldLevel(allData.levels[index]);
  }
}
