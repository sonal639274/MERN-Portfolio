import React from "react"
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { Progress } from "../../components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Eye, Pen } from "lucide-react";

import { Tabs, TabsContent } from "../../components/tabs";
import { clearAllSkillErrors } from "../../store/slices/skillSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllProjectErrors } from "../../store/slices/projectSlice";
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };

  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };
  const gotoMangeClientProjects = () => {
    navigateTo("/manage/clientprojects");
  };

  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);

  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );
  const { clientprojects, error: clientprojectError } = useSelector(
    (state) => state.clientproject
  );  


  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (clientprojectError) {
      toast.error(clientprojectError);
      dispatch(clearAllProjectErrors());
    }
  }, [
    dispatch,
    clientprojectError,
    skillLoading,
    skillError,
    skillMessage,
    projectError
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 padding" >
            <Card className="flex flex-col justify-center" style={{padding:"10px"}}>
                <CardHeader className="pb-2">
                  <CardTitle>Client Projects</CardTitle>
                  <CardTitle className="text-6xl">
                    {clientprojects && clientprojects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeClientProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center" style={{padding:"10px"}}>
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center" style={{padding:"10px"}}>
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week" className="padding">
          <TabsContent value="week">
            <Card style={{padding:"20px"}}>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center"  style={{paddingBottom:"20px"}}>
                <CardTitle>Your Projects</CardTitle>
                <Button className="w-fit" onClick={gotoMangeClientProjects}>
                Manage Projects
              </Button>
              </CardHeader>
              <CardContent>
                <Table >
                  <TableHeader>
                    <TableRow >
                      <TableHead >Banner</TableHead>
                      <TableHead>Title</TableHead>
                     
                      <TableHead className="md:table-cell">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientprojects && clientprojects.length > 0 ? (
                      clientprojects.map((element) => {
                        return (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell>
                              <div className="font-medium">
                                <img
                                  src={
                                    element.projectBanner &&
                                    element.projectBanner.url
                                  }
                                  alt={element.title}
                                  className="w-40 h-16"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{element.title}</div>
                            </TableCell>
                            <TableCell className="flex flex-row items-center gap-3 h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${element._id}`}>
                                      <button
                                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                      justify-center items-center text-green-600  hover:text-slate-950 
                                      hover:bg-green-600"
                                      >
                                        <Eye className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                     
                              <TooltipProvider>
                               
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-2xl">
                          You have not added any project.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
            <Tabs defaultValue="week" className="padding">
          <TabsContent value="week">
            <Card style={{padding:"20px"}}>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center"  style={{paddingBottom:"20px"}}>
                <CardTitle>Your Projects</CardTitle>
                <Button className="w-fit" onClick={gotoMangeProjects}>
                Manage Projects
              </Button>
              </CardHeader>
              <CardContent>
                <Table >
                  <TableHeader>
                    <TableRow >
                      <TableHead >Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Stack
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Deployed
                      </TableHead>
                      <TableHead className="md:table-cell">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects && projects.length > 0 ? (
                      projects.map((element) => {
                        return (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell>
                              <div className="font-medium">
                                <img
                                  src={
                                    element.projectBanner &&
                                    element.projectBanner.url
                                  }
                                  alt={element.title}
                                  className="w-40 h-16"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{element.title}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.stack}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.deployed}
                            </TableCell>
                            <TableCell className="flex flex-row items-center gap-3 h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${element._id}`}>
                                      <button
                                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                      justify-center items-center text-green-600  hover:text-slate-950 
                                      hover:bg-green-600"
                                      >
                                        <Eye className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/project/${element._id}`}>
                                      <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400  hover:text-slate-950 hover:bg-yellow-400">
                                        <Pen className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Edit
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                               
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-2xl">
                          You have not added any project.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Tabs defaultValue="week" className="padding" >
        <TabsContent value="week">
          <Card style={{padding:"20px"}}>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center"  style={{paddingBottom:"20px"}}>
              <CardTitle>Your Skills</CardTitle>
              <Button className="w-fit" onClick={gotoMangeSkills}>
                Manage Skills
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills.map((element) => {
                return (
                  <Card key={element._id} style={{padding:"10px"}}>
                    <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                    <img src={element.svg.url} style={{height:"30px"}} alt="" />  {element.title}
                 
                    </CardHeader>
                 
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;