
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAppMetadata, UserMetadata } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<
    Database["public"]["Views"]["user_info"]["Row"][]
  >([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .schema("public")
          .from("user_info")
          .select("*");

        if (error) {
          toast.error(error.name, {
            description: error.message,
          });
          console.error("Error:::", error);
          return;
        }
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error:::", error);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Mock data for charts
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 900 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 mt-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
                <p className="text-muted-foreground mt-1">
                  Here's an overview of your account and activity
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2 md:mt-0">
                Signed in with {user?.provider}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +10.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    API Calls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48.2k</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +12% from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  Your application performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="users">
                  <TabsList>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  </TabsList>
                  <TabsContent value="performance" className="pt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="value"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="users" className="pt-4">
                    <div className="h-[300px] overflow-hidden flex flex-col">
                      {users.length > 0 ? (
                        <div className="overflow-auto">
                          <Table>
                            <TableHeader className="sticky top-0 bg-background z-10">
                              <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Full name</TableHead>
                                <TableHead>Socials</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="overflow-auto">
                              {users.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Avatar>
                                        <AvatarImage
                                          src={
                                            (
                                              user.raw_user_meta_data as UserMetadata
                                            ).avatar_url
                                          }
                                        />
                                        <AvatarFallback>
                                          {user.email?.substring(0, 2).toUpperCase() || "UN"}
                                        </AvatarFallback>
                                      </Avatar>
                                      {user.email}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {
                                      (user.raw_user_meta_data as UserMetadata)
                                        .full_name
                                    }
                                  </TableCell>
                                  <TableCell>
                                    {(
                                      user.raw_app_meta_data as UserAppMetadata
                                    ).providers.join(", ")}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-muted-foreground flex items-center justify-center h-full">
                          Users data visualization coming soon
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="revenue" className="pt-4">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Revenue data visualization coming soon
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest actions and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="flex-1">
                          <p className="text-sm">New user signed up #{i}</p>
                          <p className="text-xs text-muted-foreground">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Frequently used features and tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Create Project",
                      "Invite Team",
                      "API Settings",
                      "Documentation",
                    ].map((action) => (
                      <button
                        key={action}
                        className="p-4 border border-border hover:border-primary/50 rounded-lg text-center transition-colors"
                      >
                        <p className="text-sm font-medium">{action}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
