class MetricsService {
  constructor(readonly repositories: any) {}

  async allMetricks() {
    return this.repositories.allMetrics();
  }
}

export default MetricsService;
