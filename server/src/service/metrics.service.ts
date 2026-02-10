class MetricsService {
  constructor(readonly repositories: any) {}

  async allMetricks() {
    return this.repositories.allMetrics();
  }

  async exportedJSONData() {
    return await this.repositories.exportedJSON();
  }
}

export default MetricsService;
