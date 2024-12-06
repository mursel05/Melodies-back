const cron = require("node-cron");
const Song = require("./Song");

// Schedule the cleanup task for every Sunday at midnight
cron.schedule("0 0 * * 0", async () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const allSongs = await Song.find();

  for (const song of allSongs) {
    const updatedLogs = Object.entries(song.dailyLogs || {}).reduce(
      (acc, [date, listens]) => {
        if (new Date(date) >= sevenDaysAgo) {
          acc[date] = listens; // Keep logs within the last 7 days
        }
        return acc;
      },
      {}
    );

    // Update the document
    song.dailyLogs = updatedLogs;
    await song.save();
  }

  console.log("Weekly cleanup completed.");
});
