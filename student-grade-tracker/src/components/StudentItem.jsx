import React from "react";

class StudentItem extends React.Component {
  constructor(props){
    super(props),
    this.state ={
      showUpdateModal: false,
      editStudent: {
        name: '',
        subject: '',
        grade: 0,
      }
    }
  }

  toggleUpdateModal = () => {

    const {student} = this.props;

    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
      editStudent: {
        name: student.name,
        subject: student.subject,
        grade: student.grade,
      }
    });
  }

  handleEditChange = (e) => {
    const {name,value} = e.target;

    this.setState({
      editStudent: {
        ...this.state.editStudent,
        [name]: value,
      }
    });
  }

  render() {
    const {
      student,
      handleDeleteStudent,
      handleUpdateGrade,
    } = this.props;

    return (
      <>
      <div
        className={`student-card ${student.passed ? "passed" : "failed"}`}
        key={student.id}
      >
        <div className="student-info">
          <h3>{student.name}</h3>
          <p>
            <strong>Subject: </strong>
            {student.subject}
          </p>
          <p>
            <strong>Grade: </strong>
            {student.grade}%
          </p>
        </div>
        <div className="student-status">
          <span
            className={`status ${student.passed ? "student-passed" : "student-failed"}`}
          >
            {student.passed ? "Passed" : "Failed"}
          </span>
        </div>
        <div className="student-actions">
          <button
            className="update-btn"
            onClick={this.toggleUpdateModal}
            title="Update Grade"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteStudent(student.id)}
            className="delete-btn"
            title="Delete Student"
          >
            Delete
          </button>
        </div>
      </div>
      {this.state.showUpdateModal && (
          <div className="update-modal">
            <button className="close-btn" onClick={this.toggleUpdateModal}>X</button>
            <h3 className="update-header">Update Student</h3>
            <input 
              type="text" 
              id="name"
              name="name"
              value={this.state.editStudent.name}
              onChange={this.handleEditChange}
            />
            <select 
              name="subject"
              value={this.state.editStudent.subject}
              onChange={this.handleEditChange} 
            >
              <option value="">Select a subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
            <input
              type="number"
              name="grade"
              className="update-grade"
              value={this.state.editStudent.grade}
              onChange={this.handleEditChange}
            />
            <button className="save-btn" onClick={()=>{
              handleUpdateGrade(student.id,this.state.editStudent);
              this.setState({
                showUpdateModal: false,
              })
            }}>Save</button>
          </div>
        )}
      </>
    );
  }
}

export default StudentItem;
