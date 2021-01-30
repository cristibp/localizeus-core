import React from "react";
import {IProject} from "app/shared/model/project.model";

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
              <a key={project.id} href={'./project/' + project.id}>{project.name}</a>
            ))
            :
            <span>Create a new project <a href='./project/new'>here</a></span>
        }
      </div>
    );
  }
}


export default ProjectsSummary;
