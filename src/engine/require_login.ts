import {Request, Response, NextFunction } from "express";

export default function requireLogin(req : Request, res: Response, next : NextFunction) {
    if (req.signedCookies.player_id) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.redirect("/login"); // or render a form, etc.
    }
  }
  