"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsvpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rsvp_schema_1 = require("./rsvp.schema");
let RsvpService = class RsvpService {
    constructor(rsvpModel) {
        this.rsvpModel = rsvpModel;
    }
    create(createDto) {
        const createdRsvp = new this.rsvpModel(createDto);
        return createdRsvp.save();
    }
    async getAll() {
        return this.rsvpModel.find().exec();
    }
    async get(id) {
        return this.rsvpModel
            .findOne()
            .where('id')
            .equals(id)
            .exec();
    }
    async update(id, updateDto) {
        return this.rsvpModel
            .findOneAndUpdate({ id: id }, updateDto, {
            new: true,
        })
            .exec();
    }
    async delete(id) {
        return this.rsvpModel.findOneAndDelete({ id: id }).exec();
    }
};
RsvpService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(rsvp_schema_1.Rsvp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RsvpService);
exports.RsvpService = RsvpService;
//# sourceMappingURL=rsvp.service.js.map