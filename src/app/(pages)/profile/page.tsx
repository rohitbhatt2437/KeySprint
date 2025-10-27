"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userProfileData, chartConfig } from "@/app/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function ProfilePage() {
  const { username, avatar, joinDate, stats, progress } = userProfileData;

  const avatarUrl = PlaceHolderImages.find(img => img.id === avatar)?.imageUrl || '';
  const avatarHint = PlaceHolderImages.find(img => img.id === avatar)?.imageHint || '';
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl} alt={username} data-ai-hint={avatarHint} />
            <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline text-4xl">{username}</CardTitle>
            <CardDescription>Member since {new Date(joinDate).toLocaleDateString()}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-card-foreground/5 rounded-lg">
              <p className="text-sm text-muted-foreground font-headline">Avg. WPM</p>
              <p className="text-3xl font-bold text-accent">{stats.avgWpm}</p>
            </div>
            <div className="p-4 bg-card-foreground/5 rounded-lg">
              <p className="text-sm text-muted-foreground font-headline">Avg. Accuracy</p>
              <p className="text-3xl font-bold text-accent">{stats.avgAccuracy}%</p>
            </div>
            <div className="p-4 bg-card-foreground/5 rounded-lg">
              <p className="text-sm text-muted-foreground font-headline">Best WPM</p>
              <p className="text-3xl font-bold text-accent">{stats.bestWpm}</p>
            </div>
            <div className="p-4 bg-card-foreground/5 rounded-lg">
              <p className="text-sm text-muted-foreground font-headline">Tests Completed</p>
              <p className="text-3xl font-bold text-accent">{stats.testsCompleted}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Progress</CardTitle>
          <CardDescription>Your typing performance over the last 7 tests.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={progress} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--accent))" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend />
              <Bar dataKey="wpm" fill="var(--color-wpm)" yAxisId="left" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
