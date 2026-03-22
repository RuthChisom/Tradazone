**Category:** Performance & Scalability

**Priority:** Low

**Affected Area:** ProfileSettings

**Description:**
During codebase analysis of the ProfileSettings, we identified that this specific functionality is lacking or flawed ("Excessive context API updates in ProfileSettings cause full application re-renders."). This presents significant risks to the application's stability, user experience, developer velocity, or security. We need this addressed to maintain production-grade standards. Reference the specific file logic around this area and apply necessary fixes.

**Acceptance Criteria:**
- [ ] Issue is properly identified and documented within the source file.
- [ ] The necessary code changes are implemented to resolve the concern.
- [ ] Testing has been performed to verify the fix does not cause regressions.
- [ ] Tests updated or added where applicable.