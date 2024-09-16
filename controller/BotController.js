const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

module.exports = class BotController extends Controller {


    async introduction(request) {
      return Response.menu.fromArrayOfString(
        [
          f("menu.recordOrder"),
          f("menu.checkStock")
        ],
        f("intro", [request.name]),
        f("template.menu")
      );
    }

    async recordOrder(request) {
      await this.reply(f("formOrderProduct"))
      await this.reply(f("footer"))
      return this.sendBasicMenu()
    }

    async checkStock(request) {
      await this.reply("Stock Sisa : 5")
      await this.reply(f("footer"))
      return this.sendBasicMenu()
    }

    async sendBasicMenu(request) {
      return Response.menu.fromArrayOfObject([
        {
          value: 'menu back',
          text: f("menu.back"),
          code: "0"
        }
      ],
      "",
      f("template.menu")
      )
    }
}