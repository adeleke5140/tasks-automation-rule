import React, { type ReactNode } from 'react'
import { Alert, Box, Button, Code, Container, Stack, Text } from '@mantine/core'
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'
import classes from './error-boundary.module.scss'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Container size="sm" mt="xl">
      <Alert color="red" variant="filled" title="Something went wrong">
        <Stack gap="md">
          <Text size="sm">
            An unexpected error occurred. The application encountered an issue and couldn't continue.
          </Text>

          {error && (
            <Box>
              <Text size="xs" fw={600}>
                Error Details:
              </Text>
              <Text size="xs" c="dimmed" className={classes.errorDetails}>
                {error.message}
              </Text>
            </Box>
          )}

          {import.meta.env.DEV && error.stack && (
            <details className={classes.stackTraceContainer}>
              <summary>
                <Text size="xs" component="span">
                  Stack trace (development only)
                </Text>
              </summary>
              <Code block className={classes.stackTrace}>
                {error.stack}
              </Code>
            </details>
          )}

          {resetErrorBoundary && (
            <Button size="xs" onClick={resetErrorBoundary} variant="white" color="red">
              Try Again
            </Button>
          )}
        </Stack>
      </Alert>
    </Container>
  )
}

export const ErrorBoundary = ({
  children,
  fallback,
  onError,
  onReset,
}: {
  children: ReactNode
  fallback?: ReactNode | React.ComponentType<FallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onReset?: () => void
}) => {
  const FallbackComponent = fallback
    ? typeof fallback === 'function'
      ? fallback
      : () => <>{fallback}</>
    : ErrorFallback

  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent} onError={onError} onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  )
}

export const SectionErrorBoundary = ({ children, name = 'This section' }: { children: ReactNode; name?: string }) => {
  return (
    <ErrorBoundary
      fallback={
        <Alert color="orange" variant="light">
          <Text size="sm">{name} encountered an error and cannot be displayed.</Text>
        </Alert>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
