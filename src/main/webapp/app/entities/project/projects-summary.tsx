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
        <ul className="list-group">
          {
            projects?.length ? projects.map((project, i) => (
                (
                  <li className="list-group-item list-group-item-action">
                    <Link key={project.id} to={`key-management/${+project.id}`}>{project.name}</Link>
                  </li>
                )
              ))
              :
              <span>Create a new project <Link to='/project/new'>here</Link></span>
          }
        </ul>
      </div>
    );
  }
}


export default ProjectsSummary;
