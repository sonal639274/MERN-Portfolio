import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoading } from "../../store/slices/loadingSlice";
import Loading from "./Loading";
import { backend_URL } from "../../lib/backend_URL";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const loading = useSelector((store)=> store.loading.loading)
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        backend_URL+"/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
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
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORTFOLIO
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
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
                <p>{element.description}</p>
                <p>{element.technologies}</p>
                {element.deployed === "yes" ? (
                  <div className="links">
                    <Link to={element.gitRepoLink}>GitHub</Link>
                  </div>
                ):"In Progress..."}
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
                <p className="para"><span className="span">Desc</span> : {element.description}</p>
                <p className="para"><span className="span">Tech</span> : {element.technologies}</p>
                {element.deployed === "Yes" ? (
                  <div className="links">
                    <Link to={element.gitRepoLink}><button className="btn">GitHub</button></Link>
                    <Link to={element.projectLink}><button className="btn">Project</button></Link>
                  </div>
                ):"In Progress..."}
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
  );
};

export default Portfolio;
