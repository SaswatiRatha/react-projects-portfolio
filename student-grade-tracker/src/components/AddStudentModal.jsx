import React from "react";

class AddStudentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newStudent: {
        name: "",
        subject: "",
        grade: "",
        tempGrade: "",
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, subject, grade } = this.state.newStudent;
    if (!name.trim() || !subject || !grade) {
      alert("Please fill in all fields!");
      return;
    }

    if (!name.trim() || !subject || !grade) {
      alert("Please fill in all fields!");
      return;
    }

    this.props.handleAddStudent(this.state.newStudent);

    this.setState({
      newStudent: {
        name: "",
        subject: "",
        grade: "",
        tempGrade: "",
      },
    });
  };

  render() {
    const { newStudent } = this.state;
    return (
      <div className="add-student-section">
        <h2>Add New Student</h2>
        <form onSubmit={this.handleSubmit} className="add-student-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name:</label>
            <input
              type="text"
              id="studentName"
              name="name"
              value={newStudent.name}
              onChange={this.handleInputChange}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentSubject">Subject:</label>
            <select
              name="subject"
              id="studentSubject"
              value={newStudent.subject}
              onChange={this.handleInputChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="studentGrade">Grade (0-100):</label>
            <input
              type="number"
              id="studentGrade"
              name="grade"
              value={newStudent.grade}
              onChange={this.handleInputChange}
              placeholder="Enter student's grade"
              min="0"
              max="100"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Add Student
            </button>
            <button className="cancel-btn" type="button" onClick={this.props.toggleModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddStudentModal;
