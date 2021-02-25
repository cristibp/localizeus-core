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
              <Link key={project.id} to={`key-management/${+ project.id}`}>{project.name}</Link>
            ))
            :
            <span>Create a new project <Link to='/project/new'>here</Link></span>
        }
      </div>
    );
  }
}


export default ProjectsSummary;
