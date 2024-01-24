export const DEFAULT_CLOUDWATCH_CONFIG = {
  agent: {
    metrics_collection_interval: 60,
    run_as_user: 'root',
    usage_data: false,
  },
  metrics: {
    namespace: 'fck-nat',
    metrics_collected: {
      net: {
        /**
         * This is a bit flimsy. We need to know these interface names ahead of time for the config, but these just
         * happen to be the values for AL2023.
         */
        resources: ['ens5', 'ens6'],
        measurement: [
          { name: 'bytes_recv', rename: 'BytesIn', unit: 'Bytes' },
          { name: 'bytes_sent', rename: 'BytesOut', unit: 'Bytes' },
          { name: 'packets_sent', rename: 'PacketsOutCount', unit: 'Count' },
          { name: 'packets_recv', rename: 'PacketsInCount', unit: 'Count' },
          { name: 'drop_in', rename: 'PacketsDropInCount', unit: 'Count' },
          { name: 'drop_out', rename: 'PacketsDropOutCount', unit: 'Count' },
        ],
      },
      netstat: {
        measurement: [
          { name: 'tcp_syn_sent', rename: 'ConnectionAttemptOutCount', unit: 'Count' },
          { name: 'tcp_syn_recv', rename: 'ConnectionAttemptInCount', unit: 'Count' },
          { name: 'tcp_established', rename: 'ConnectionEstablishedCount', unit: 'Count' },
        ],
      },
      ethtool: {
        interface_include: ['ens5', 'ens6'],
        metrics_include: [
          'bw_in_allowance_exceeded',
          'bw_out_allowance_exceeded',
          'conntrack_allowance_exceeded',
          'pps_allowance_exceeded',
        ],
      },
      mem: {
        measurement: [
          { name: 'used_percent', rename: 'MemoryUsed', unit: 'Percent' },
        ],
      },
    },
    append_dimensions: {
      InstanceId: '${aws:InstanceId}',
      AutoScalingGroupName: '${aws:AutoScalingGroupName}',
    },
  },
};
