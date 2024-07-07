export const navigations = [
  {
    name: "Stage 1 : Application",
    icon: "favorite",
    disabled: true,
    children: [
      { name: "Personnel Detail", path: "/student/material/form", iconText: "F", disabled: true },
      {
        name: "Academic Details",
        path: "/student/material/Academicdetails",
        iconText: "A",
        disabled: true
      },
      {
        name: "CompatativeExam",
        path: "/student/material/CompatativeExam",
        iconText: "A",
        disabled: true
      },
      {
        name: "Recomenderdetails",
        path: "/student/material/Recomenderdetails",
        iconText: "A",
        disabled: true
      },
      {
        name: "DesireCource",
        path: "/student/material/DesireCource",
        iconText: "A",
        disabled: true
      },
      {
        name: "PersnolQuestion",
        path: "/student/material/PersnolQuestion",
        iconText: "A",
        disabled: true
      }
    ]
  }
];
export const pgExprence = [
  {
    name: "Stage 1 : Application",
    icon: "favorite",
    disabled: true,
    children: [
      { name: "Personnel Detail", path: "/student/material/form", iconText: "F", disabled: true },
      {
        name: "Academicdetails",
        path: "/student/material/Academicdetails",
        iconText: "A",
        disabled: true
      },
      {
        name: "CompatativeExam",
        path: "/student/material/CompatativeExam",
        iconText: "A",
        disabled: true
      },
      {
        name: "CareerHighlight",
        path: "/student/material/CareerHighlight",
        iconText: "A",
        disabled: true
      },
      {
        name: "Recomenderdetails",
        path: "/student/material/Recomenderdetails",
        iconText: "A",
        disabled: true
      },
      {
        name: "DesireCource",
        path: "/student/material/DesireCource",
        iconText: "A",
        disabled: true
      },
      {
        name: "PersnolQuestion",
        path: "/student/material/PersnolQuestion",
        iconText: "A",
        disabled: true
      }
    ]
  }
];
export const underGragute = [
  {
    name: "Stage 1 : Application",
    icon: "favorite",
    disabled: true,
    children: [
      { name: "Personnel Detail", path: "/student/material/form", iconText: "F", disabled: true },
      { name: "Academic", path: "/student/material/UgAcademic", iconText: "A", disabled: true },
      { name: "Exams", path: "/student/material/Exams", iconText: "A", disabled: true },
      {
        name: "Recomenderdetails",
        path: "/student/material/Recomenderdetails",
        iconText: "A",
        disabled: true
      },
      {
        name: "DesireCource",
        path: "/student/material/DesireCource",
        iconText: "A",
        disabled: true
      },
      {
        name: "PersnolQuestion",
        path: "/student/material/PersnolQuestion",
        iconText: "A",
        disabled: true
      }
    ]
  }
];
export const addUniversities = [
  {
    name: "Stage 2 : Universities Selection",
    icon: "favorite",
    disabled: true,
    children: [
      {
        name: "Select University",
        path: "/student/material/Selectuniversity",
        iconText: "F",
        disabled: true
      }
    ]
  }
];
export const DocumentEvalution = [
  {
    name: "Stage 3 : Documents Evaluation",
    icon: "favorite",
    disabled: true,
    children: [
      {
        name: "Select Document",
        path: "/student/material/DocumentReview",
        iconText: "F",
        disabled: true
      }
    ]
  }
];
export const ApplicationStatus = [
  {
    name: "Stage 4 : Application Status",
    icon: "favorite",
    disabled: true,
    children: [
      {
        name: "Application Status",
        path: "/student/material/Applicationstatus",
        iconText: "F",
        disabled: true
      }
    ]
  }
];
export const visa = [
  {
    name: "Stage 5: Visa Processing",
    icon: "favorite",
    disabled: true,
    children: [
      { name: "Visa Processing", path: "/student/material/Visa", iconText: "F", disabled: true }
    ]
  }
];
export const Accomodation = [
  {
    name: "Stage 4 : Accomodation",
    icon: "favorite",
    disabled: true,
    children: [
      {
        name: "Accomodation",
        path: "/student/material/Accomodation",
        iconText: "F",
        disabled: true
      }
    ]
  }
];
export const Banking = [
  {
    name: "Stage 4 : Banking and Finance",
    icon: "favorite",
    disabled: true,
    children: [
      {
        name: "Banking and Finance",
        path: "/student/material/Banking",
        iconText: "F",
        disabled: true
      }
    ]
  }
];

for (const item of navigations) {
  item.disabled = true;
}
