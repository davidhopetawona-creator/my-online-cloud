# TODO

- [ ] Implement like-once per comment for the public comments section.
  - [ ] Add a storage structure to remember which user/device liked which comment.
  - [ ] Update reaction handler to block repeat likes.
- [ ] Implement “instant” visibility across open tabs/windows in the same browser.
  - [ ] Add `storage` event listeners to re-render public sections when relevant localStorage keys change.
- [ ] Extend club uploads to support both **pictures** and **videos**.
  - [ ] Add `mediaType` to club upload objects.
  - [ ] Update club upload form UI to let members choose image vs video.
  - [ ] Update rendering to show either `<img>` or `<video>` (or embed if URL is for a known provider).
  - [ ] Ensure edits/removals re-render instantly.
- [ ] Update admin club management/any lists that depend on club uploads to render both media types.
- [ ] Manual testing checklist
  - [ ] Like once per comment.
  - [ ] Post/edit media in one tab and see other tab update.
  - [ ] Confirm public site renders images/videos correctly for clubs.

