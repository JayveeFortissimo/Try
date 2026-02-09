import { Request, Response } from "express";
class MetricsController {
  constructor(readonly metrics: any) {}

  allMetrics = async (req: Request, res: Response) => {
    const allMetrics = await this.metrics.allMetricks();

    res.json({
      message: "OK",
      data: allMetrics,
    });
  };
}

export default MetricsController;
