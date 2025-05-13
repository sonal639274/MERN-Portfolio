import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setLoading } from "../../store/slices/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { backend_URL } from "../../lib/backend_URL";

const ClientProject = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((store)=> store.loading.loading)

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        backend_URL+"/api/v1/clientproject/getall",
        { withCredentials: true }
      );
      setProjects(data.clientprojects);
      dispatch(setLoading(false));
      
    };
    getMyProjects();
  }, [ dispatch]);
 
  return (
    <>
    {
      loading ? (
    <Loading/>
      ) : (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[1rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          LIVE{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORJECTS
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          LIVE <span className="text-tubeLight-effect font-extrabold">PROJECTS</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {viewAll
          ? projects &&
            projects.map((element) => {
              return (
                <div className="project" key={element._id}>
                <Link to={element.projectLink} >
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                  />
                </Link>
                <div className="project-info">
                <h2>{element.title}</h2>              
                </div>
                </div>
              );
            })
          : projects &&
            projects.slice(0, 9).map((element) => {
              return (
                <div className="project" key={element._id}>
                <Link to={element.projectLink} >
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                  />
                </Link>
                <div className="project-info">
                <h2 className="heading"><span className="span"> Project</span> : {element.title}</h2>
                </div>
                </div>
              );
            })}
      </div>
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  )}
  </>
  )}

  export default ClientProject
