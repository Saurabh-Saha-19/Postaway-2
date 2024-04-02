import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepo = new LikeRepository();
  }

  async toggleLikes(req, res, next) {
    try {
      const userId = req.userId;
      const type = req.query.type;
      const id = req.params.id;

      const response = await this.likeRepo.toggle(userId, type, id);
      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }

  async getLikes(req, res, next) {
    try {
      const likeableId = req.params.likeableId;
      const response = await this.likeRepo.getLikes(likeableId);
      return res.status(200).json({ success: true, response });
    } catch (err) {
      next(err);
    }
  }
}
