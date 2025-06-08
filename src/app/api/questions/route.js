export async function GET() {
  const questions = [
    {
      id: "1",
      question: "Do you enjoy learning new programming languages?",
      options: ["Yes", "No", "Sometimes"],
      correctAnswer: "Yes",
    },
    {
      id: "2",
      question: "Have you ever worked on a group coding project?",
      options: ["Yes", "No", "Not yet"],
      correctAnswer: "Yes",
    },
    {
      id: "3",
      question: "Do you feel confident using Git for version control?",
      options: ["Yes", "No", "Still learning"],
      correctAnswer: "Still learning",
    },
    {
      id: "4",
      question: "Would you prefer working remotely over in-office?",
      options: ["Yes", "No", "Depends"],
      correctAnswer: "Depends",
    },
    {
      id: "5",
      question: "Do you actively practice data structures and algorithms?",
      options: ["Yes", "No", "Occasionally"],
      correctAnswer: "Occasionally",
    },
    {
      id: "6",
      question: "Are you interested in contributing to open-source projects?",
      options: ["Yes", "No", "Maybe later"],
      correctAnswer: "Yes",
    },
    {
      id: "7",
      question: "Do you find frontend development enjoyable?",
      options: ["Yes", "No", "Sometimes"],
      correctAnswer: "Yes",
    },
    {
      id: "8",
      question: "Have you deployed a website or app on your own?",
      options: ["Yes", "No", "Planning to"],
      correctAnswer: "Yes",
    },
    {
      id: "9",
      question: "Would you be open to mentoring junior developers?",
      options: ["Yes", "No", "Maybe"],
      correctAnswer: "Maybe",
    },
    {
      id: "10",
      question: "Do you prefer working with a framework like React?",
      options: ["Yes", "No", "Depends on the project"],
      correctAnswer: "Yes",
    },
  ];

  return Response.json(questions);
}
