import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leaderboardData } from "@/app/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {

  const getImage = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || '';
  }
  
  const getAvatarHint = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageHint || '';
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Trophy className="h-8 w-8 text-accent" />
        <CardTitle className="font-headline text-3xl">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">WPM</TableHead>
              <TableHead className="text-right">Accuracy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow key={user.rank}>
                <TableCell className="font-medium text-lg text-accent">{user.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={getImage(user.avatar)} alt={user.user} data-ai-hint={getAvatarHint(user.avatar)} />
                      <AvatarFallback>{user.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.user}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-accent">{user.wpm}</TableCell>
                <TableCell className="text-right font-mono">{user.accuracy}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
