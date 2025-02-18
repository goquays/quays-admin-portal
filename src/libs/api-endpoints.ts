const apiEndpoints = {
  authentication: {
    login: "/api/v1/auth/login",
  },
  registration: {
    signup: "/api/v1/auth/signup",
  },
  insuranceController: {
    getInsurance: "/api/v1/insurance",
    initiateInsurance: "/api/v1/insurance/initiate",
    completeInsurance: (sessionId: string) => `/api/v1/insurance/${sessionId}/complete`,
  },
  claimsController: {
    createClaims: "/api/v1/claims",
  },
  common: {
    getPetMetadata: (petType: string) => `/api/v1/common/metadata/${petType}`,
  },
};

export default apiEndpoints;
