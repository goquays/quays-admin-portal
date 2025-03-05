const apiEndpoints = {
  authentication: {
    login: "/api/v1/auth/login",
    adminLogin: "/api/admin/v1/login",
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
  admin: {
    userStats: "/api/admin/v1/dashboard",
    getUsers: "/api/admin/v1/dashboard/users",
    exportUsers: "/api/admin/v1/dashboard/users/export",
    getPolicies: (type: string) => `/api/admin/v1/dashboard/policy/${type}`,
    exportPolicies: "/api/admin/v1/dashboard/policy/{type}/export",
  }
};

export default apiEndpoints;
