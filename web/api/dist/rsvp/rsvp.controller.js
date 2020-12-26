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
exports.RsvpController = void 0;
const rsvp_schema_1 = require("./rsvp.schema");
const rsvp_service_1 = require("./rsvp.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
let RsvpController = class RsvpController {
    constructor(service) {
        this.service = service;
    }
    create(createRsvpDto) {
        this.service.create(createRsvpDto);
    }
    async getAll() {
        return this.service.getAll();
    }
    async get(id) {
        return this.service.get(id);
    }
    update(id, updateRsvpDto) {
        return this.service.update(id, updateRsvpDto);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rsvp_schema_1.CreateRsvpDto]),
    __metadata("design:returntype", void 0)
], RsvpController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "get", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rsvp_schema_1.CreateRsvpDto]),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "delete", null);
RsvpController = __decorate([
    common_1.Controller('rsvp'),
    __metadata("design:paramtypes", [rsvp_service_1.RsvpService])
], RsvpController);
exports.RsvpController = RsvpController;
//# sourceMappingURL=rsvp.controller.js.map