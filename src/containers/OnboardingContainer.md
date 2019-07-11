Displays different onboarding screens based on stages.

Currently there are four stages: A1, A2, B1, B2

The container returns an [`OnboardingCard`](#onboardingcard), which wraps the
contents of each stage. The container also handles the routing of each stage
using the `stage` `match` param from the URL using React Router.

If there is no `stage` param, it will return a `Redirect` to the user’s last
visited stage or the first stage.

## All users will see onboarding

If the user has not been onboarded, i.e. there is no `onboardingStage` field in
the user document, or if they have not finished onboarding, i.e. they have not
reached the last onboarding stage, they will be redirected to here via the
[`Landing`](#landing) component.
