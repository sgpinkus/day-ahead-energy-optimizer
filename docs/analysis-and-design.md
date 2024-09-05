# RESOLUTIONS & REQUIREMENTS

  - Conceptually goal is frontend to device-kit (convex, discrete, da-ahead)
  - User can CRUDL devices, profiles and scenarios. These are organized into projects. Projects exist mainly for applying different access control and defaults. In future can allow to migrate or copy content from project to project.
  - Components (devices, profiles, scenarios) have a basis fixed at creation time. This is how many time step they have.
  - There is association between profiles, devices, and scenarios - to be associated the things must have compatible basis.
    - Scenarios have many devices.
    - Devices have zero or more profiles for different things depending on the device type.
  - You can only uses basis of 2, 4, 8, 12, 24, 48, 96, 192, 240, 288, with default being 48. In future we can allow arbitrary.

# IMPLEMENTATION PLAN

  - Layout is ~same as patchlytics so just do that. Opportunity to test doing model the not OO way.
  - It's all localStorage to start.
  - Forms for each device type.
  - Widget for profile input and edit.
  
# KEY QUESTIONS
**Q: Relationship between a devices and profiles?**
D: Exactly what are they?

  - L|H bounds for ~ every device type. Can either be a profile or a 
  - Fixed device profile - the L|H bound are equal.
  
That's it AFAIK (could be more ..). To have be sat L <= H all t. But if profiles are mutable this can change after association how to handle? Solution: just allow unsat! This is fine. Secondly profile can be deleted. How to handle? Alt 1: Make a copy on ref. Alt 2: ON DELETE ERROR. Alt 3: ON DELETE CASCADE. Alt 4: Ref by id and let it dangle - "the profile does not exist, or just clean up on demand - silently unset it.

Related issue is results are tied to a certain version of a scenario. Seem clear need to keep both together. So if scenario can evolve. how are we doing that? For device-kit experiements we did it explicitly - create the scenario run the optimisation then stash both. Alt 1: same "leave it to the user" approach here giving a way to save or snapshot a  scenario. Is there an better alt? Alt 2: keep a version of everything and full lineage, stash version number with ecah optimisation result. Alt 3: Take a snapshot (serialization) at optimisation time. #3 is an addon to #1. #2 is overkill

*Conclusion:* Alt 1 initially. User can export optimisation results and scenario.

**Q: "Scenarios"?**
From device-kit have the term "device set", but this is really just a bus, use "bus" herein. Can attempt to solve any bus really. So what's a "scenario" over a bus? Given a collection of devices in the same name space, would be useful to be able to take some subset of device and generation technologies then run optimization. In a given space there's is many many different scenarios you might want to run and for each you need a bus .. So we just have busses and any bus can be solved. We also need projects, but this is different from a scenario because 

Summary: "Scenario" whatever that ever meant out, "bus" in. Projects are different again.

**Q: Projects, why?**
For mk1 would be easier not to have to bother with projects. Just have a hodge podge of devices, profiles, busses. Yeah sure but ... ultimately we do want projects: Story: Billy at home. Billl for friend. Billy at work. Billy as a consultant that works on many different sites ... Sharing things between project is beyond mk1, and mk1 project is just a dumb container.
