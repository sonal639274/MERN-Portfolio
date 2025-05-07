import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slices/loadingSlice";
import Loading from "./Loading";
import { backend_URL } from "../../lib/backend_URL";


const Skills = ( ) => {
  const [skills, setSkills] = useState([]);
  const loading = useSelector((store) => store.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMySkills = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(
           backend_URL + "/api/v1/skill/getall",
          { withCredentials: true }
        );
        setSkills(data.skills);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getMySkills();
  }, [ dispatch]);

  if (loading) {
    return (
    <Loading/>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills &&
          skills.map((element) => (
            <Card
              className="h-fit p-7 flex flex-col justify-center items-center gap-3"
              key={element._id}
            >
              <img
                src={element.svg && element.svg.url}
                alt="skill"
                className="h-12 sm:h-24 w-auto"
              />
              <p className="text-muted-foreground text-center">
                {element.title}
              </p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Skills;
