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
        if (!createdRsvp) {
            throw new common_1.HttpException('Answer was not created.', common_1.HttpStatus.BAD_REQUEST);
        }
        return createdRsvp.save();
    }
    async getAll() {
        const allAnswers = await this.rsvpModel.find().exec();
        if (!allAnswers) {
            throw new common_1.HttpException('No answers found.', common_1.HttpStatus.NOT_FOUND);
        }
        return allAnswers;
    }
    async get(id) {
        const answer = await this.rsvpModel.findOne({ name: id }).exec();
        if (!answer) {
            throw new common_1.HttpException('Answer not found.', common_1.HttpStatus.NOT_FOUND);
        }
        return answer;
    }
    async update(id, updateDto) {
        const answer = await this.rsvpModel
            .findOneAndUpdate({ _id: id }, updateDto, {
            new: true,
            useFindAndModify: false,
        })
            .exec();
        if (!answer) {
            throw new common_1.HttpException('Answer not updated.', common_1.HttpStatus.BAD_REQUEST);
        }
        return answer;
    }
    async delete(id) {
        const answer = this.rsvpModel.findOneAndDelete({ id: id }).exec();
        if (!answer) {
            throw new common_1.HttpException('Answer was not deleted.', common_1.HttpStatus.BAD_REQUEST);
        }
        return answer;
    }
};
RsvpService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(rsvp_schema_1.Rsvp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RsvpService);
exports.RsvpService = RsvpService;
//# sourceMappingURL=rsvp.service.js.map