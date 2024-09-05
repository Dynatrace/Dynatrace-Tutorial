import React from "react";
import { Flex } from "@dynatrace/strato-components/layouts";
import { TitleBar } from "@dynatrace/strato-components-preview/layouts";
import { ProgressCircle } from "@dynatrace/strato-components/content";
import { convertToTimeseries } from "@dynatrace/strato-components-preview/conversion-utilities";
import {
  DataTable,
  TableColumn,
  TableRow,
} from "@dynatrace/strato-components-preview/tables";
import { IntentButton } from "@dynatrace/strato-components-preview/buttons";
import { useDqlQuery } from "@dynatrace-sdk/react-hooks";
import {
  CPU_USAGE_QUERY,
  getHostAvgCpuQuery,
  getHostCpuUsageQuery,
} from "../queries";
import { Colors } from "@dynatrace/strato-design-tokens";

export const HostList = () => {
  const result = useDqlQuery({
    body: {
      query: CPU_USAGE_QUERY,
    },
  });

  const columns: TableColumn[] = [
    {
      header: "Host ID",
      accessor: "hostId",
      autoWidth: true,
    },
    {
      header: "HostName",
      accessor: "hostName",
      autoWidth: true,
    },
    {
      id: "cpuUsage",
      header: "CPU Usage",
      columnType: "meterbar",
      accessor: ({ idle, ioWait, user, system, steal, other }) => [
        { name: "CPU idle", value: idle },
        { name: "I/O wait", value: ioWait },
        { name: "CPU user", value: user },
        { name: "CPU system", value: system },
        { name: "CPU steal", value: steal },
        { name: "CPU other", value: other },
      ],
      config: {
        showTooltip: true,
      },
      ratioWidth: 1,
    },
    {
      id: "avgCpu",
      header: "Average CPU %",
      columnType: "sparkline",
      accessor: (row) =>
        result.data ? convertToTimeseries([row], result.data.types) : [],
      config: {
        color: Colors.Charts.Rainbow.Magenta.Default,
      },
      ratioWidth: 1,
    },
  ];

  return (
    <Flex width="100%" flexDirection="column" justifyContent="center" gap={16}>
      <TitleBar>
        <TitleBar.Title data-testid="page-title">Hosts Insights</TitleBar.Title>
      </TitleBar>
      {result.isLoading && <ProgressCircle data-testid="progress-circle" />}
      {result.data && (
        <DataTable
          data={result.data.records}
          columns={columns}
          data-testid="data-table"
        >
          <DataTable.UserActions>
            <DataTable.RowActions>
              {(row: TableRow) => (
                <IntentButton
                  iconOnly
                  payload={{
                    "dt.elements": [
                      {
                        "dt.markdown": `# Host ${row.values.hostName} insights`,
                      },
                      {
                        "dt.query": getHostCpuUsageQuery(row.values.hostId),
                        visualization: "areaChart",
                      },
                      {
                        "dt.query": getHostAvgCpuQuery(row.values.hostId),
                      },
                    ],
                  }}
                  data-testid="intent-button"
                />
              )}
            </DataTable.RowActions>
          </DataTable.UserActions>
          <DataTable.Pagination data-testid="data-table-pagination" />
        </DataTable>
      )}
    </Flex>
  );
};
