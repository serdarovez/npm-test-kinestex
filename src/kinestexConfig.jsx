// kinestexConfig.js
// Configuration for all KinesteX Integration Options

export const INTEGRATION_OPTIONS = {
  MAIN: {
    name: "Main View (Plan Category)",
    path: "",
    input: {
      type: "select",
      label: "Plan Category",
      options: ["Cardio", "Strength", "Weight Management", "Rehabilitation"],
    },
    defaultInput: "Cardio",
    postDataMap: (input) => ({ planCategory: input }),
  },
  PLAN: {
    name: "Individual Plan View",
    path: "/plan/",
    input: {
      type: "text",
      label: "Plan Name or ID",
      placeholder: "e.g., Circuit Training or 22B3qRU2r75hVXHgGiGx",
    },
    defaultInput: "Circuit Training",
    urlParam: true,
  },
  WORKOUT: {
    name: "Individual Workout View",
    path: "/workout/",
    input: {
      type: "text",
      label: "Workout Name or ID",
      placeholder: "e.g., Fitness Lite or 9zE1kzOzpU5d5dAJrPOY",
    },
    defaultInput: "Fitness Lite",
    urlParam: true,
  },
  CHALLENGE: {
    name: "Challenge View",
    path: "/challenge",
    input: {
      type: "text",
      label: "Challenge Exercise ID",
      placeholder: "e.g., jz73VFlUyZ9nyd64OjRb",
    },
    defaultInput: "jz73VFlUyZ9nyd64OjRb",
    additionalInputs: {
      countdown: {
        type: "number",
        label: "Duration (seconds)",
        defaultValue: 100,
      },
    },
    postDataMap: (input, additional) => ({
      exercise: input,
      countdown: additional.countdown,
      showLeaderboard: true,
    }),
  },
  LEADERBOARD: {
    name: "Leaderboard View",
    path: "/leaderboard/",
    input: {
      type: "text",
      label: "Leaderboard Exercise Name",
      placeholder: "e.g., Squats",
    },
    defaultInput: "Squats",
    additionalInputs: {
      username: {
        type: "text",
        label: "Highlight Username (optional)",
        defaultValue: "",
      },
    },
    urlQueryParam: (userId) => `userId=${userId}`,
    postDataMap: (input, additional) => ({
      exercise: input,
      isHideHeaderMain: true,
      username: additional.username || undefined,
    }),
  },
  EXPERIENCE: {
    name: "AI Experience View",
    path: "/experiences/",
    input: {
      type: "text",
      label: "Experience Name",
      placeholder: "e.g., assessment",
    },
    defaultInput: "assessment",
    urlParam: true,
    postDataMap: () => ({ exercise: "balloonpop" }),
  },
  CAMERA: {
    name: "Camera Component (Motion Analysis)",
    path: "/camera",
    input: {
      type: "text",
      label: "Initial Exercise ID",
      placeholder: "e.g., CnOcLpBo5RAyznE0z3jt",
    },
    defaultInput: "CnOcLpBo5RAyznE0z3jt",
    additionalInputs: {
      exercises: {
        type: "text",
        label: "All Exercises (comma-separated)",
        defaultValue: "CnOcLpBo5RAyznE0z3jt,Squats,Lunges",
      },
      switchExercise: {
        type: "text",
        label: "Switch Exercise To",
        defaultValue: "Squats",
      },
      includeRealtimeAccuracy: {
        type: "checkbox",
        label: "Include Real-time Accuracy",
        defaultValue: true,
      },
      isDrawingPose: {
        type: "checkbox",
        label: "Draw Human Body Recognition",
        defaultValue: true,
      },
      mediapipeModel: {
        type: "select",
        label: "Pose Model",
        options: ["full", "light"],
        defaultValue: "full",
      },
      hideMusicIcon: {
        type: "checkbox",
        label: "Hide Music Icon",
        defaultValue: false,
      },
      shouldShowCameraSelector: {
        type: "checkbox",
        label: "Show Camera Selector",
        defaultValue: false,
      },
      landmarkColor: {
        type: "text",
        label: "Landmark Color (hex, e.g., #14FF00)",
        defaultValue: "",
      },
      hideMistakesFeedback: {
        type: "checkbox",
        label: "Hide Mistakes Feedback",
        defaultValue: false,
      },
      resetPlanProgress: {
        type: "checkbox",
        label: "Reset Plan Progress",
        defaultValue: false,
      },
      shouldAskCamera: {
        type: "checkbox",
        label: "Ask Camera Permission (App Level)",
        defaultValue: true,
      },
      language: {
        type: "text",
        label: "Language (e.g., en, es)",
        defaultValue: "en",
      },
    },
    postDataMap: (input, additional) => ({
      currentExercise: input,
      exercises: additional.exercises.split(",").map((e) => e.trim()),
      customParams: {
        includeRealtimeAccuracy: additional.includeRealtimeAccuracy,
        isDrawingPose: additional.isDrawingPose,
        mediapipeModel: additional.mediapipeModel,
        hideMusicIcon: additional.hideMusicIcon,
        shouldShowCameraSelector: additional.shouldShowCameraSelector,
        landmarkColor: additional.landmarkColor || undefined,
        hideMistakesFeedback: additional.hideMistakesFeedback,
        resetPlanProgress: additional.resetPlanProgress,
        shouldAskCamera: additional.shouldAskCamera,
        language: additional.language,
      },
    }),
  },
};
