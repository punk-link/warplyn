# ADR-008: The renderer is an unprivileged client of a loopback service

- Status: Accepted
- Date: 2026-08-21
- Updated: 2026-10-02
- Scope: Browser, HTTP, Electron IPC, credentials, and privileged local access
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-009](adr-009-native-settings-credentials-and-data-switching.md)

## Context

The renderer handles private content but cannot safely own credentials, database handles, arbitrary filesystem access, or provider clients.

## Decision

Keep the renderer an unprivileged client. The local service owns provider calls, research, persistence, credentials, and filesystem work. Browser HTTP listens on loopback by default and accepts only the configured origin. Electron composes the same application services without an HTTP listener and exposes finite, validated IPC through a sandboxed, context-isolated preload.

Neither renderer receives credentials, privileged handles, raw server errors, or unrestricted IPC. Native Settings and telemetry use separate finite desktop clients with sender and request validation.

Deny renderer-created windows and in-renderer navigation. Open only validated HTTP and HTTPS links in the system browser. Desktop close coordinates the active Draft checkpoint before cancelling streams and closing persistence.

Author-selected browser directory handles grant only their browser capability. Native privileged paths remain controlled by Electron main under [ADR-009](adr-009-native-settings-credentials-and-data-switching.md).

Send credentials and minimum request context only to the explicitly selected provider. Model discovery uses that provider's documented endpoint; research requires a supported adapter. Approved destinations are defined in the [runtime privacy and network policy](../reference/runtime-privacy-and-network-policy.md).

Expanding hosts, origins, IPC, network destinations, persistence, permissions, or provider storage requires explicit security review. Loopback does not protect against another process running as the same OS user.

## Consequences

Authors can use browser development and Electron without trusting React with local system authority. Exposing the service beyond loopback requires authentication and a separate decision.

## Verification and references

Test configuration and transport boundaries, sender validation, safe responses, allowlists, cancellation, and shutdown. Use the [runtime policy](../reference/runtime-privacy-and-network-policy.md) and [testing guide](../guides/testing.md).

