import { ApplicationServiceStores, ApplicationSettingsDependencies, ApplicationServiceIntegration } from "./create-application-services.js";
import type { ApplicationSkillServices } from "./application-skill-services.js";


export interface CreateApplicationServicesOptions {
    stores: ApplicationServiceStores;
    settings: ApplicationSettingsDependencies;
    integration?: ApplicationServiceIntegration;
    skills: ApplicationSkillServices;
}
