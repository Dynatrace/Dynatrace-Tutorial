export const CPU_USAGE_QUERY = `timeseries cpuAvg = avg(dt.host.cpu.usage), by:{dt.entity.host, host.name}
| fieldsRename hostId = dt.entity.host, hostName = host.name
| lookup [
  timeseries {
    idle=avg(dt.host.cpu.idle),
    ioWait=avg(dt.host.cpu.iowait),
    user=avg(dt.host.cpu.user),
    system=avg(dt.host.cpu.system),
    steal=avg(dt.host.cpu.steal)
  },
  by:{dt.entity.host}
  | fieldsAdd idle = arrayAvg(idle), ioWait = arrayAvg(ioWait), user = arrayAvg(user), system = arrayAvg(system), steal = arrayAvg(steal)
  | fieldsAdd other = 100 - idle - ioWait - user - system - steal
], sourceField:hostId, lookupField:dt.entity.host, fields:{idle, ioWait, user, system, steal, other}`;

export const getHostCpuUsageQuery = (hostId: string) => `timeseries {
  idle=avg(dt.host.cpu.idle),
  ioWait=avg(dt.host.cpu.iowait),
  user=avg(dt.host.cpu.user),
  system=avg(dt.host.cpu.system),
  steal=avg(dt.host.cpu.steal)
},
filter:{dt.entity.host == "${hostId}"}
| fieldsAdd other = 100 - idle[] - ioWait[] - user[] - system[] - steal[]`;

export const getHostAvgCpuQuery = (hostId: string) =>
  `timeseries cpuAvg = avg(dt.host.cpu.usage), filter:{dt.entity.host == "${hostId}"}`;