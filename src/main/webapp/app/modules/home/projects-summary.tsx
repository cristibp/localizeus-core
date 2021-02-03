import React from "react";
import {IProject} from "app/shared/model/project.model";
import {Link} from "react-router-dom";

export interface IProjectsSummaryProps {
  projects: IProject[];
}

class ProjectsSummary extends React.Component<IProjectsSummaryProps> {
  render() {
    const {projects} = this.props;
    return (
      <div>
        {
          projects?.length ? projects.map((project, i) => (
              <Link key={project.id} to={`project/${+ project.id}`}>{project.name}</Link>
            ))
            :
            <span>Create a new project <a href='/project/new'>here</a></span>
        }
      </div>
    );
  }
}


export default ProjectsSummary;
