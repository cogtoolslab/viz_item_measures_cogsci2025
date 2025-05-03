import { Router } from "express";
import { AnswerController } from "./AnswerController";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); 

export class AnswerAPI {
  private router: Router;
  private controllerContext: AnswerController;

  constructor(router: Router) {
    this.router = router;
    this.controllerContext = new AnswerController();
  }

  public returnRouter() {
    this.postAnswer();
    this.listAnswer();
    this.getCondition();
    return this.router;
  }

  private getCondition() {
    this.router.get("/condition", this.controllerContext.readConditions());
  }

  private listAnswer() {
    this.router.get("/answers", this.controllerContext.list());
  }

  private postAnswer() {
    this.router.post("/answer", this.controllerContext.create());
  }

}
