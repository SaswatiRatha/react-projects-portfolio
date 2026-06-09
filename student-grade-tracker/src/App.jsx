import React from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import AddStudentModal from "./components/AddStudentModal";
import studentData from "./data/students";
import FilterSection from "./components/FilterSection";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filter: "all",
      sortBy: "default",
      isOpen: false,
    };
  }

  componentDidMount() {
    console.log("componentDidMount: component has mounted to DOM");
    this.setState({
      students: studentData,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: component has updated");
    console.log("Previous state: ", prevState);
    console.log("Current state: ", this.state.students);

    if (prevState.students.length === 0) {
      return;
    }

    if (prevState.students.length < this.state.students.length) {
      console.log("New student added!");
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: Component is going to be removed");
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleAddStudent = (studentData) => {
    const gradeNumber = parseInt(studentData.grade, 10);

    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert("Please provide grade between 0 to 100!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: studentData.name.trim(),
      subject: studentData.subject,
      grade: gradeNumber,
      passed: gradeNumber >= 60,
      tempGrade: "",
    };

    this.setState({
      students: [...this.state.students, newStudent],
      newStudent: {
        name: "",
        subject: "",
        grade: "",
        tempGrade: "",
      },
      isOpen: false,
    });
  };

  handleDeleteStudent = (studentID) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      this.setState({
        students: this.state.students.filter(
          (student) => student.id !== studentID,
        ),
      });
    }
  };

  handleUpdateGrade = (studentID, updatedData) => {
    const newGradeNumber = parseInt(updatedData.grade, 10);
    console.log(
      "Updating grade for student ID: ",
      studentID,
      "New Data: ",
      updatedData,
    );
    if (isNaN(newGradeNumber) || newGradeNumber < 0 || newGradeNumber > 100) {
      alert("Please provide grade between 0 to 100!");
      return;
    }

    this.setState({
      students: this.state.students.map((student) => {
        if (student.id === studentID) {
          return {
            ...student,
            name: updatedData.name,
            subject: updatedData.subject,
            grade: newGradeNumber,
            passed: newGradeNumber >= 60,
            tempGrade: "",
          };
        }
        return student;
      }),
    });
  };

  handleFilter = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  handleSortBy = (sortBy) => {
    this.setState({
      sortBy: sortBy,
    });
  };

  handleFilteredStudents = () => {
    if (this.state.filter === "passed") {
      return this.state.students.filter((student) => student.passed);
    } else if (this.state.filter === "failed") {
      return this.state.students.filter((student) => !student.passed);
    }
    return this.state.students;
  };

  handleSortedStudents = () => {
    const filteredStudents = [...this.handleFilteredStudents()];

    if (this.state.sortBy === "high") {
      return filteredStudents.sort((a, b) => b.grade - a.grade);
    } else if (this.state.sortBy === "low") {
      return filteredStudents.sort((a, b) => a.grade - b.grade);
    }
    return filteredStudents;
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
        </header>

        <main className="main">            
            {this.state.isOpen && (
              <AddStudentModal
                handleAddStudent={this.handleAddStudent}
                isOpen={this.state.isOpen}
                toggleModal={this.toggleModal}
              />
            )}

            <div className="button-filter">
              {!this.state.isOpen && (<button className="add-student-btn" onClick={this.toggleModal}>Add New Student</button>)}
              <FilterSection
                filter={this.state.filter}
                sortBy={this.state.sortBy}
                handleFilter={this.handleFilter}
                handleSortBy={this.handleSortBy}
              />
            </div>

          <section className="student-section">
            <h2>Student List ({this.state.students.length})</h2>
            <StudentList
              students={this.handleSortedStudents()}
              handleDeleteStudent={this.handleDeleteStudent}
              handleToggleStatus={this.handleToggleStatus}
              handleGradeChange={this.handleGradeChange}
              handleUpdateGrade={this.handleUpdateGrade}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
