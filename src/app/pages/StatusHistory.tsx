import React from "react";
import { Flex, Container } from "@dynatrace/strato-components/layouts";
import { ProgressCircle } from "@dynatrace/strato-components/content";
import { Heading } from "@dynatrace/strato-components/typography";
import { TitleBar } from "@dynatrace/strato-components-preview/layouts";
import {
  Chip,
  ChipOwnProps,
} from "@dynatrace/strato-components-preview/content";
import { useAppFunction } from "@dynatrace-sdk/react-hooks";

interface StatusItem {
  title: string;
  color: ChipOwnProps["color"];
  description: string;
  date: string;
}

export const StatusHistory = () => {
  const result = useAppFunction<StatusItem[]>({
    name: "get-status-history",
    data: { active: true },
  });

  return (
    <Flex flexDirection="column" padding={32}>
      <TitleBar>
        <TitleBar.Title data-testid="page-title">Status history</TitleBar.Title>
      </TitleBar>
      {result.isLoading && <ProgressCircle data-testid="progress-circle" />}
      {result.data && (
        <Flex
          flexDirection="column"
          gap={16}
          data-testid="status-history-container"
        >
          {result.data.map(({ title, color, description, date }) => (
            <Container key={date}>
              <Flex flexDirection="column" gap={8}>
                <Chip color={color} data-testid="status-item-description">
                  {description}
                </Chip>
                <Heading level={5} data-testid="status-item-title">
                  {title}
                </Heading>
                <Chip size="condensed" data-testid="status-item-date">
                  {new Date(date).toUTCString()}
                </Chip>
              </Flex>
            </Container>
          ))}
        </Flex>
      )}
    </Flex>
  );
};
