# Website measurement

Warplyn's landing pages and documentation use Google Analytics property `G-QWD5DZEQZG`. Website analytics are separate from desktop diagnostic and usage data.

## Configure Analytics

In Google Analytics, open the website's web data stream and enable Enhanced Measurement for page views and outbound clicks. Confirm collection in Realtime by opening the public website and following a download link to GitHub releases.

The site's download links point to a GitHub release page. An outbound `click` event with a `link_url` under `https://github.com/punk-link/warplyn/releases` measures interest in downloading. It does not establish that an installer was downloaded or the app was installed. No additional JavaScript is needed for this measurement when Enhanced Measurement is enabled.

The `file_download` event applies to links to supported file extensions, such as `.exe`. It does not apply to the current release-page links. See Google's [Enhanced Measurement reference](https://support.google.com/analytics/answer/9216061).

## Review results

Review source/medium and landing pages in Traffic acquisition, documentation page views in Pages and screens, and outbound release-page clicks in Events or an Exploration filtered by `link_url`. Filter release-page clicks rather than treating every outbound click as download interest.

Use consistent UTM parameters on public campaign links, for example `https://warplyn.com/?utm_source=community&utm_medium=referral&utm_campaign=launch`. Use campaign names that identify the actual channel. Keep personal information out of campaign parameters.

GitHub release asset counts provide a separate measure of file downloads:

```powershell
gh release view v0.6.2 --json assets --jq '.assets[] | {name,downloadCount}'
```

Compare installer assets (`.exe` and `.deb`) separately from update packages. GitHub counts are cumulative download requests, not unique people or confirmed installations, and they cannot be attributed to individual website visits through this setup.

Verify website collection and campaign attribution after deployment. Search impressions and search queries come from the search engines' webmaster tools rather than Analytics alone.
