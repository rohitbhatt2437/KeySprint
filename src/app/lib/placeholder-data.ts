import type { ChartConfig } from "@/components/ui/chart";

export const leaderboardData = [
  { rank: 1, user: 'cypher', wpm: 180, accuracy: 99, avatar: 'avatar-1' },
  { rank: 2, user: 'glitch', wpm: 175, accuracy: 100, avatar: 'avatar-2' },
  { rank: 3, user: 'neon_racer', wpm: 168, accuracy: 98, avatar: 'avatar-3' },
  { rank: 4, user: 'shadow', wpm: 165, accuracy: 97, avatar: 'avatar-4' },
  { rank: 5, user: 'blaze', wpm: 162, accuracy: 99, avatar: 'avatar-5' },
  { rank: 6, user: 'vortex', wpm: 159, accuracy: 96, avatar: 'avatar-6' },
  { rank: 7, user: 'zenith', wpm: 155, accuracy: 98, avatar: 'avatar-7' },
  { rank: 8, user: 'matrix', wpm: 152, accuracy: 100, avatar: 'avatar-8' },
  { rank: 9, user: 'pulse', wpm: 148, accuracy: 95, avatar: 'avatar-9' },
  { rank: 10, user: 'echo', wpm: 145, accuracy: 97, avatar: 'avatar-10' },
];

export const userProfileData = {
  username: 'cypher',
  avatar: 'avatar-1',
  joinDate: '2023-05-15',
  stats: {
    avgWpm: 145,
    avgAccuracy: 97,
    bestWpm: 180,
    testsCompleted: 256,
  },
  progress: [
    { date: '2024-05-01', wpm: 130, accuracy: 95 },
    { date: '2024-05-02', wpm: 132, accuracy: 96 },
    { date: '2024-05-03', wpm: 135, accuracy: 95 },
    { date: '2024-05-04', wpm: 138, accuracy: 97 },
    { date: '2024-05-05', wpm: 140, accuracy: 98 },
    { date: '2024-05-06', wpm: 142, accuracy: 97 },
    { date: '2024-05-07', wpm: 145, accuracy: 97 },
  ],
};

export const chartConfig = {
  wpm: {
    label: "WPM",
    color: "hsl(var(--accent))",
  },
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;
